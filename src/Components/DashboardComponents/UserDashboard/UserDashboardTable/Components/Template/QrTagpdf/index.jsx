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
    page: {
        width: '400px',
        height: '400px',
        fontFamily: "Noto Sans JP",
        paddingBottom: '65px',
        paddingTop: '65px',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: "18px",
        scale: '0.5'
    },
    gridContainer: {
        border: '2px solid black'
    },
    gridItem1: {
        padding: '10px',
        flexDirection: 'row'
    },
    gridItem2: {
        margin: '10px'
    },
    qrCode: {
        width: "150px",
        height: "150px"
    },
    person: {
        border: '2px solid black',
        marginLeft: '20',
        padding: '0',
        width: "200px",
        height: "150px"
    },
    personTitle: {
        display: 'block',
        textAlign: 'center', 
        borderBottom: '2px solid black'
    },
    personImg: {
        padding: '5px',
        height: "100px"
    },
    id: {
        padding: '10px',
        display: 'block'
    }
});

const QrTagPdfDownload = () => {
    console.log('__QrTagPdfDownload starts');
    const [pdfData, setPdfData] = useState([]);
    
    // Create a database
    const db = new Dexie('ettms');
    db.version(1).stores({
        tagPdfData: 'tag, qrImage'
    });
    db.open().then(() => {
        return db.tagPdfData.toArray();
    }).then((data) => {
        const jsObject = JSON.parse(JSON.stringify(data));
        console.log('__QrTagPdfDownload jsObject data ', jsObject);
        setPdfData(jsObject);
        console.log('__QrTagPdfDownload pdfData data ', pdfData);
    }).catch((error) => {
        console.error(error);
    });

    return (
        <Document>
        
            <Page size="A4" style={styles.page}>
            {pdfData?.map((row, index) =>
                <View key={index} style={styles.gridContainer}>
                    <View style={styles.gridItem1}>
                        <Image style={styles.qrCode}
                        src={`${row.qrImage}`}
                        alt="qr code image"/>
                        <View style={styles.person}>
                            <Text style={styles.personTitle}>
                                担当
                            </Text>
                            {/* <Image style={styles.personImg}
                            src={`data:image/png;base64,iVBORw0KGg....`}
                            alt="person image"/> */}
                        </View>
                    </View>
                <View style={styles.gridItem2}>
                    <Text style={styles.id}>
                        <Text>追跡ID </Text>
                        <Text> {row.tag.substring(0, row.tag.indexOf("."))}</Text>
                    </Text>
                </View>
                <View style={styles.gridItem2}>
                    <Text style={styles.id}>
                        <Text>デバイスID </Text>
                        <Text> {row.tag.substring(row.tag.indexOf(".") + 1)}</Text>
                    </Text>
                </View>  
                </View>
                )}
            </Page>
        </Document>
    );
};

export default QrTagPdfDownload;