// @ts-nocheck
import React, { useState, useEffect } from 'react';
import '../../App.css';
import { API, Storage } from 'aws-amplify';
import { listNotes } from '../../../src/graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../../src/graphql/mutations';
import { IconButton } from '@chakra-ui/react';
import { AiOutlinePicture } from 'react-icons/ai'
const initialFormState = { name: '', description: '' }

type Notes = {
    id: string;
    name: string;
    description: string;
}

function ImageUploadBox() {
    const [notes, setNotes] = useState<Notes[]>([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function deleteNote({ id }) {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteNoteMutation, variables: { input: { id } } });
    }

    //S3への画像のアップロード
    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchNotes();
    }
    async function createNote() {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createNoteMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setNotes([...notes, formData]);
        setFormData(initialFormState);
    }

    async function fetchNotes() {
        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(notesFromAPI.map(async note => {
            if (note.image) {
                const image = await Storage.get(note.image);
                note.image = image;
            }
            return note;
        }))
        setNotes(apiData.data.listNotes.items);
    }

    //ここまで

    return (
        <IconButton
            aria-label='Camera Role'
            colorScheme='teal'
            onClick={onChange}
            size='lg'
            icon={<AiOutlinePicture />} />
    );
}

export default ImageUploadBox;
