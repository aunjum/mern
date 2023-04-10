
import React, { useState }from "react";
//  import Image from 'next/image';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
Font.register({
  family: "Noto Sans JP",
  src: "https://cdn.jsdelivr.net/npm/noto-sans-japanese@1.0.0/fonts/NotoSansJP-Light.otf"
});

// Create styles
const styles = StyleSheet.create({
    page:{
        fontFamily: "Noto Sans JP",
        paddingBottom: '65px',
        paddingTop: '60px',
        paddingHorizontal: '35px'
    },
    header: {
        padding: 5,
        color: "black",
        fontWeight: "bold",
        fontSize: "8px"
    },
      projectName: {
        marginTop:"40px",
        fontSize: "8px",
        textAlign: "left",
        marginLeft: "75%",
    },
    projectTitle:{
      fontWeight: 'bold',
        marginTop: "20px",
        textAlign: "center",
        fontSize: 20
    },
    tableHeader: {
          fontWeight: "bold",
        marginTop: "20px",
        fontSize: "12px",
        textAlign: "left",
        marginLeft: "5%",
        width: "90%",
        marginRight: "5%"
    },
    
    table: {
        marginTop: "20px",
        width: '90%',
        marginLeft: "5%",
        marginRight: "5%",
        fontSize: "9px",
        textAlign: "center"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid black',
    },
    row1: {
        width: '80%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row2: {
        width: '30%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row3: {
        width: '70%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row4: {
        width: '70%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row5: {
        width: '40%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row6: {
        width: '35%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row7: {
        width: '45%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row8: {
        width: '25%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row9: {
        width: '25%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    row10: {
        width: '25%',
        borderRight: '1px solid black',
        paddingTop: "8px",
        paddingBottom: "8px"
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    }
});

// Create Document Component
const SummaryPdfDownload = (props) => {
const [pdfData, setPdfData] = useState(props.summaryPdfData);

  return (
    <Document>
      <Page size="A4" style={styles.page} pageBreak="avoid" page={1}>
        <br />
        <View>
          <Text style={styles.projectName}>案件番号：
          {props.projectName}
          </Text>
        </View>

        <View>
            <Text style={styles.projectTitle}>
            プロジェクトまとめ
            </Text>
        </View>

        <View>
            <Text style={styles.tableHeader}>
            追跡IDごと情報リスト
            </Text>
        </View>

        <View style={styles.table}>
            <View style={styles.row} wrap={true}>
                <Text style={styles.row1}>追跡ID</Text>
                <Text style={styles.row2}>機器種別</Text>
                <Text style={styles.row3}>登録日付</Text>
                <Text style={styles.row4}>完了日付</Text>
                <Text style={styles.row5}>要求仕様</Text>
                <Text style={styles.row6}>現在追跡処理</Text>
                <Text style={styles.row7}>機器ID</Text>
                <Text style={styles.row8}>ベンダー</Text>
                <Text style={styles.row9}>プロダクト</Text>
                <Text style={styles.row10}>シリアル</Text>
            </View>
        {pdfData?.map((row) =>
            <View key={row._id} style={styles.row} wrap={false}>
                <Text style={styles.row1}>
                {row.device_tag.substring(0, row.device_tag.indexOf("."))}
                </Text>
                <Text style={styles.row2}>{row.device_type.name_en}</Text>
                <Text style={styles.row3}>{row.createdAt}</Text>
                <Text style={styles.row4}>{row.updatedAt}</Text>
                <Text style={styles.row5}>{row.spacifications}</Text>
                <Text style={styles.row6}>{row.state}</Text>
                <Text style={styles.row7}>
                {row.device_tag.substring(row.device_tag.indexOf(".") + 1)}
                </Text>
                <Text style={styles.row8}>{row.vendor}</Text>
                <Text style={styles.row9}>{row.model}</Text>
                <Text style={styles.row10}>{row.serial}</Text>
            </View>
            )}
        </View>
        <br />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
      </Page>
    </Document>
  );
};

export default SummaryPdfDownload;