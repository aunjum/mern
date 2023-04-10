import QRCode  from 'qrcode';
import Dexie from 'dexie';
const ConvertQRTag = async (tag) => {
    console.log('ConvertQRTag starts');
    const _tag = tag;
    const db = new Dexie('ettms');
    db.version(1).stores({
      tagPdfData: 'tag, qrImage'
    });
    QRCode.toDataURL(_tag, {
      width: 300,
      margin: 2
    }, 
    (err, _tag) => {
      if (err) return console.error(err);
      // Open the database
      db.open().then(() => {
        // Check if the key exists
        return db.tagPdfData.get(tag);
      })
    .then((existingObject) => {
      if(existingObject === undefined){
        // Key does not exist, add the object
        try {
            db.tagPdfData.add({tag: tag, qrImage: _tag});
        } catch (e) {
          console.log (`Error: ${e}`);
        }
      } else {
          // Key already exists, do not add the object
          console.log("Key already exists");
      }
    }).catch((error) => {
        console.error(error);
    });
    });
    console.log('ConvertQRTag ends');
  }

  export default ConvertQRTag;