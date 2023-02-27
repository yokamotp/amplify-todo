import { DataStore } from 'aws-amplify';
import { Todo } from '../../../models';

//Todoの作成
export const createTodoApi = async (data: { content: string }) => {
    const { content } = data;
    try {
        await DataStore.save(
            new Todo({
                content,
                isDone: false,
            })
        )
    } catch (error) {
        throw error;
    }
}

export const fetchTodoListApi = async () => {
    try {
        //一覧取得処理の実行
        const todoList = await DataStore.query(Todo);
        return todoList;

    } catch (error) {
        throw error;
    }
};

// todoの編集
export const updateTodoApi = async (data: { id: string; isDone: boolean }) => {
    const { id, isDone } = data;
    try {
        //変更元のデータを取得する
        const original = await DataStore.query(Todo, id);

        //originalがundefinedの場合
        if (!original) {
            alert('指定されたTodoはデータベース上に存在しません。');
            return;
        }
        //編集処理の実行
        await DataStore.save(
            Todo.copyOf(original, (updated) => {
                updated.isDone = isDone;
            })
        )
    } catch (error) {
        throw error;
    }
}

// todoの削除
export const deleteTodoApi = async (data: { id: string }) => {
    const { id } = data;
    try {
        //削除するTodoを取得
        const deleteTodo = await DataStore.query(Todo, id);
        if (!deleteTodo) {
            alert('指定されたTodoはデータベース上に存在しません。');
            return;
        }

        //削除処理の実行
        await DataStore.delete(deleteTodo);

    } catch (error) {
        throw (error);

    }
}
