import React, { useState } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font
} from "@react-pdf/renderer";
import Dexie from 'dexie';

Font.register({
    family: "Noto Sans JP",
    src: "https://cdn.jsdelivr.net/npm/noto-sans-japanese@1.0.0/fonts/NotoSansJP-Light.otf"
});

// Create styles
const styles = StyleSheet.create({
    page:{
        width: '400px',
        height: '400px',
        fontFamily: "Noto Sans JP",
        paddingBottom: '65px',
        paddingTop: '65px',
        justifyContent: 'center',
        fontSize: "18px",
        scale: '0.5'
    },
    title: {
        marginTop: "5px",
        fontSize: "14px",
        textAlign: "left",
        marginLeft: "10%",
        width: "80%",
        marginRight: "10%"
    },
    table: {
      border: '1px solid black',
        marginTop: "20px",
        width: '50%',
        marginLeft: "25%",
        marginRight: "25%",
        fontSize: "12px",
        textAlign: "center"
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
  	imageSize: {
        width: "100px",
        height: "100px"
    },
    text: {
      marginLeft: "25%",
        marginRight: "25%",
        paddingTop: "5px",
        paddingBottom: "5px"
    }
});

const QrCodePdfDownload = () => {
  console.log('==========handleQrCodePdf QrCodePdfDownload template starts==========');

  const [pdfData, setPdfData] = useState([]);

  const db = new Dexie('ettms');
  db.version(1).stores({
    codePdfData: 'tag, qrImage'
  });
  db.open().then(() => {
    return db.codePdfData.toArray();
  }).then((data) => {
    const jsObject = JSON.parse(JSON.stringify(data));
    console.log('==========handleQrCodePdf QrCodePdfDownload json data==========', jsObject);
    setPdfData(jsObject);
    console.log('==========handleQrCodePdf QrCodePdfDownload pdf data==========', pdfData);
  }).catch((error) => {
    console.error(error);
  });

  return (
      <Document>
          <Page size="A4" style={styles.page} pageBreak="avoid" page={1}>
          <br />

          <View>
              <Text style={styles.title}
                  render={({ pageNumber }) => (`追跡用QRコード：ページ ${pageNumber}`)} fixed />
          </View>

          {
            pdfData?.map((row, index) =>
            <View key={index} style={styles.table}>
                    <View style={styles.row} wrap={false}>
                        <Text style={styles.text}>
                            <Image
                            style={styles.imageSize}
                            src={`${row.qrImage}`}
                            alt="qr code image" />
                            <Text>{`${row.tag}`}</Text>
                        </Text>
                        <br/>
                    </View>
            </View>
            )
          }
          <br />
          </Page>
      </Document>
  );
};

export default QrCodePdfDownload;