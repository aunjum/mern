import Dexie from 'dexie';

const LocalDBCreate = async () => {
    const db = new Dexie('ettms');
    db.version(1).stores({
        codePdfData: 'tag, qrImage',
        tagPdfData: 'tag, qrImage',
        mobilePdfData: 'tag, qrImage'
    });
    console.log('🟢 local database created');
}

export default LocalDBCreate;
