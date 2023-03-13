import { DataStore } from 'aws-amplify';
import { Picture } from '../../../models';

//pictureの作成
export const createPictureApi = async (data: { src: string }) => {
    const { src } = data;
    try {
        await DataStore.save(
            new Picture({
                src,
            })
        )
    } catch (error) {
        throw error;
    }
}

export const fetchPictureListApi = async () => {
    try {
        //一覧取得処理の実行
        const pictureList = await DataStore.query(Picture);
        return pictureList;

    } catch (error) {
        throw error;
    }
};

// pictureの編集
export const updatePictureApi = async (data: { id: string; src: string }) => {
    const { id, src } = data;
    try {
        //変更元のデータを取得する
        const original = await DataStore.query(Picture, id);

        //originalがundefinedの場合
        if (!original) {
            alert('指定された写真はないとよ〜。');
            return;
        }
        //編集処理の実行

        // await DataStore.save(
        //     Picture.copyOf(original, (updated) => {
        //         updated.isDone = isDone;
        //     })
        // )
    } catch (error) {
        throw error;
    }
}

// pictureの削除
export const deletePictureApi = async (data: { id: string }) => {
    const { id } = data;
    try {
        //削除するPictureを取得
        const deletePicture = await DataStore.query(Picture, id);
        if (!deletePicture) {
            alert('指定された写真はないとよ〜。');
            return;
        }

        //削除処理の実行
        await DataStore.delete(deletePicture);

    } catch (error) {
        throw (error);

    }
}
