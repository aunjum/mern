import Dexie from 'dexie';

const LocalDBClear = () => {
    const db = new Dexie('ettms');
    db.version(1).stores({
        codePdfData: 'tag, qrImage',
        tagPdfData: 'tag, qrImage',
        mobilePdfData: 'tag, qrImage'
    });
    db.open().then(() => {
        db.codePdfData.clear().then(() => {
            console.log('🔴 local database cleared');
        });
        db.tagPdfData.clear().then(() => {
            console.log('🔴 local database cleared');
        });
        db.mobilePdfData.clear().then(() => {
            console.log('🔴 local database cleared');
        });
    });
}

export default LocalDBClear;
