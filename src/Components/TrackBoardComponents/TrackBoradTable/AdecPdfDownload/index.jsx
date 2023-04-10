
import React, { useState, useEffect,setState }from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//  import Image from 'next/image';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Font
} from "@react-pdf/renderer";
import { fontSize, textAlign } from "@mui/system";

// import NotoSansJPLight from "../../../../styles/Font/NotoSansJPLight.otf";
// console.log("Noto check jp",NotoSansJPLight);
Font.register({
  family: "Noto Sans JP",
  src: "https://cdn.jsdelivr.net/npm/noto-sans-japanese@1.0.0/fonts/NotoSansJP-Light.otf",
  // src: NotoSansJPLight
});



// Create styles
const styles = StyleSheet.create({
//   document: {
//     width: "80vw",
//     backgroundImage: 'url("../certificateBackGround.png")',
//     height: "80vh",
//   },
//   page: {
//     flexDirection: "column",
//     backgroundImage: 'url("../certificateBackGround.png")',
//     height: "500px",
//   },
page:{
  fontFamily: "Noto Sans JP",
  paddingBottom: 65,
  paddingTop: 60,
},
  header: {
    padding: 5,
    backgroundColor: "blue",
  },
  header2: {
    marginTop: "5px",
    padding: 5,
  },
  name: {
    marginTop: "1px",
    padding: "15px",
  },
  headerText: {
    fontSize: "50px",
    textAlign: "center",
    padding: "5px",
  },
  headerText2: {
    fontSize: "25px",
    textAlign: "center",
  },
  bodySection: {
    marginTop: "5px",
    padding: "15px",
  },
  bodyText: {
    fontSize: "10px",
    textAlign: "left",
    marginLeft: "30px",
  },
  bodyTextBold: {
    fontSize: "11px",
    textAlign: "left",
    marginLeft: "15px",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  bodyTextBold1: {
    fontSize: "11px",
    textAlign: "left",
    marginLeft: "30px",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  bodyTextUnbold: {
    fontSize: "10px",
    textAlign: "left",
    marginLeft: "2px",
    display: "flex",
    flexDirection: "row",
  },
  bodyText1: {
    marginTop: "1px",
    fontSize: "16px",
    textAlign: "left",
    marginLeft: "25px",
  },
  bodyText2: {
    marginTop:"10px",
    fontSize: "10px",
    textAlign: "left",
    marginLeft: "65%",
  },
  noteText: {
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
    textDecoration: "underline",
    
  },
  
  contentText: {
    fontSize: "10px",
    textAlign: "left",
    marginLeft: "40px",
    padding:"10px",
    border: "1px",
    width: "380px",
    fontWeight: "bold",
    
  },
  contentText1: {
    fontSize: "10px",
    textAlign: "left",
    marginLeft: "30px",
    marginTop: "5px",
    marginBottom: "5px",
    paddingTop:"0px",
    paddingLeft:"10px",
    paddingBottom: "5px",
    paddingRight: "10px",
    border: "1px",
    width: "445px",
    fontWeight: "bold",
    
  },
  contentBorder:{
    marginLeft:"40px",
    marginTop: "10px",
    width: "460px",
  },
  conclusionSection: {
    marginTop: "2px",
    padding: "10px",
  },
  noteSection: {
    marginTop: "2px",
    padding: "10px",
  },
  img: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "40%",
    //width: "100px",
    height: "80%",
    marginBottom: "5px",
  },
  imageSize: {
    marginTop: "1px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100px",
    //width: "100px",
    height: "100px",
    marginBottom: "1px",
  },
  signatureBody: {
    textAlign: "right",
  },
  signature: {
    marginLeft: "70%",
    marginTop: "5px",
    width: "20%",
    //width: "100px",
    height: "50%",
  },
  signatureName: {
    marginLeft: "60%",
  },
  link: {
    textDecoration: "underline",
    fontSize: "20px",
    textAlign: "left",
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },

  title:{
    marginTop: "20px",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },

  sectionHeader: {
    marginTop: "20px",
    fontSize: "11px",
    textAlign: "left",
    marginLeft: "10%",
    width: "80%",
    marginRight: "10%"
  },
  sectionBody: {
    marginTop: "20px",
    fontSize: "10px",
    textAlign: "left",
    marginLeft: "25%",
    width: "60%",
    marginRight: "10%"
  },
  sectionBody1: {
    marginTop: "2px",
    fontSize: "10px",
    textAlign: "left",
    marginLeft: "25%",
    width: "60%",
    marginRight: "10%"
  },
  sectionFooter: {
    marginTop: "20px",
    fontSize: "11px",
    textAlign: "left",
    marginLeft: "10%",
    width: "80%",
    marginRight: "10%"
  },

  tableHeader1: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "left",
    marginLeft: "10%",
    width: "80%",
    marginRight: "10%"
  },
  tableHeader2: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "left",
    marginLeft: "10%",
    width: "80%",
    marginRight: "10%"
  },

  table: {
    marginTop: "20px",
    width: '70%',
    marginLeft: "15%",
    marginRight: "15%",
    fontSize: "10px",
    textAlign: "center"
  },
  trackTable: {
    marginTop: "20px",
    width: '70%',
    marginLeft: "15%",
    marginRight: "15%",
    fontSize: "10px",
    textAlign: "center"
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
  },
  trackRow: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
  },
  header: {
    color: "black",
    fontWeight: "bold",
    fontSize: "12px"
  },
  trackHeader: {
    color: "black",
    fontWeight: "bold",
    fontSize: "12px"
  },
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '50%',
    borderRight: '1px solid black',
    paddingTop: "8px",
    paddingBottom: "8px",
   

  },
  trackRow1: {
    width: '35%',
    borderRight: '1px solid black',
    paddingTop: "8px",
    paddingBottom: "8px",

  },
  row2: {
    width: '25%',
    borderRight: '1px solid black',
    paddingTop: "8px",
    paddingBottom: "8px"
    
  },
  row2Add: {
    width: '25%',
    borderRight: '1px solid black',
    paddingTop: "8px",
    paddingBottom: "8px"
    
  },
  trackRow2: {
    width: '30%',
    borderRight: '1px solid black',
    paddingTop: "8px",
    paddingBottom: "8px"
    
  },
  row3: {
    width: '25%',
    borderRight: '1px solid black',
    paddingTop: "8px",
    paddingBottom: "8px"
   
  },
  trackRow3: {
    width: '35%',
    borderRight: '1px solid black',
    paddingTop: "8px",
    paddingBottom: "8px"
   
  },
  row4: {
    width: '25%',
    paddingTop: "8px",
    paddingBottom: "8px"
   
  },
  row5: {
    width: '20%',
  }
});

// Create Document Component
 const AdecPdfDownload = (props) => {
    //const data = props.pdf1[0];
//   console.log(props.eventName);
//   console.log(props.noteData[0]);
//    const myLists = props.noteData;  
  // const listItems = myLists.map((myList) => 
  //    console.log(JSON.stringify(myList.name))  
  // ); 
//   console.log(listItems);
const [name, setName] = useState(); 
const [trackData, setTrackData] = useState(props.trackData);
const [deviceData, setDeviceData] = useState(props.deviceData);
const [recordData, setRecordData] = useState(props.recordData);
console.log("track data", trackData );
console.log("device data", deviceData);
//console.log(listItems);
var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var d= date+' '+time;
var dateTime = today.toLocaleString();

// const t = new Date(myLists.map((myList) => 
//     (JSON.stringify(myList.createdAt))
// )
// );

function getDatePlease(D){
  return new Date(D).toLocaleString();
}




  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>ULTRA-X BD</Text>
        </View> */}
        
        {/* <View style={styles.header}>
          <Text style={styles.headerText2}>Note Information of VIPNOTE</Text>
        </View> */}
        <br />
        {/* // { data?.map((row) =>
          //   row.OBJECT_TRACE_ID )} */}
          {/* {data?.map((row) =>{
            <View>
            <Text style={styles.bodyText2}>Track ID : {row.OBJECT_TRACE_ID} </Text>
             
          </View>
          })} */}
        <View>
          <Text style={styles.bodyText2}>Track ID : { trackData.track_tag.tag_number }</Text>
           
        </View>
        <View>
        <Text style={styles.title}>Tracking Information Certificate</Text>
        </View>

        <View>
        <Text style={styles.sectionHeader}>Regarding the equipment listed below, the data is correct that all processing has been completed in accordance with the requested processing.
It will be certified by the Association of Data Erase Certification (ADEC).</Text>
        </View>

        <View>
        <Text style={styles.sectionBody}>Tracking Start Date : {getDatePlease(trackData.track_start_date)}</Text>
        </View>

        <View>
        <Text style={styles.sectionBody1}>Tracking Completion Date : {getDatePlease(trackData.track_end_date)}</Text>
        </View>

        <View>
        <Text style={styles.sectionBody1}>Required specifications : {trackData.request_type.title_en}</Text>
             
        {/* <Text style={styles.sectionBody1}>Required specifications : Is it working (それは働いていますか)</Text> */}

        </View>
      
        <View>
        <Text style={styles.sectionFooter}>This document serves as proof that your company data erasure work has been completed.</Text>
        </View>

        <View>
        <Text style={styles.tableHeader1}>Device Details</Text>
        </View>
       

        <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <Text style={styles.row1}>Device ID</Text>
        <Text style={styles.row2Add}>Device Type</Text>
        <Text style={styles.row2}>Manufacturer</Text>
        <Text style={styles.row3}>Model</Text>
        <Text style={styles.row4}>Serial</Text>
      </View>
      { deviceData?.map((row) =>
            
        <View key={row._id} style={styles.row} wrap={false}>
          <Text style={styles.row1}>
          {row._id}
          </Text>
          <Text style={styles.row2Add}>{row.device_type.name_en}</Text>
          <Text style={styles.row2}>{row.vendor}</Text>
          <Text style={styles.row3}>{row.model}</Text>
          <Text style={styles.row4}>{row.serial}</Text>
        </View>
        )} 

        {/* <View key={2} style={styles.row} wrap={false}>
          <Text style={styles.row1}>
          17536735474004063071_2
          </Text>
          <Text style={styles.row2}>Apple</Text>
          <Text style={styles.row3}>CF-W7CWYAAC</Text>
          <Text style={styles.row4}>8BKSA39281</Text>
        </View> */}
        
     
    </View>

    <View>
        <Text style={styles.tableHeader2}>Record Information</Text>
        </View>

        <View style={styles.trackTable}>
      <View style={[styles.trackRow, styles.trackHeader]}>
        <Text style={styles.trackRow1}>Date</Text>
        <Text style={styles.trackRow2}>Processing Name</Text>
        <Text style={styles.trackRow2}>Software Used</Text>
        <Text style={styles.trackRow2}>Location</Text>
        <Text style={styles.trackRow3}>Photo</Text>
      </View>
      { recordData?.map((row) =>
        <View key={row._id} style={styles.trackRow} wrap={false}>
          <Text style={styles.trackRow1}>
          {getDatePlease(row.record_date_time)}
          </Text>
          <Text style={styles.trackRow2}>{row.processing_type.title_en}</Text>
          <Text style={styles.trackRow2}>{row.tool_used}</Text>
          <Text style={styles.trackRow2}>{row.location}</Text>
          <Text style={styles.trackRow3}>image</Text>
        </View>
         )} 
     
    </View>


        {/* <View style={styles.bodySection}>
          <Text style={styles.bodyText1}> Event Name: {props.eventName} </Text>
        </View> */}
        {/* <View style={styles.noteSection}>
          <Text style={styles.noteText}> Note list of {props.eventName} </Text>
        </View> */}
        {/* <View style={styles.conclusionSection}>
          <Text
            style={styles.bodyText}
            
            >
              Note No: {"1"}
              </Text>
        </View> */}
        {/* <View style={styles.conclusionSection}>
          <Text
            style={styles.bodyText}
            
            >
              Event Name: {"Summer Event 1"}
              </Text>
        </View> */}
        

        
        {/* {myLists.map((myList,index) =>
        <View style={styles.contentBorder}>
        <View style={styles.conclusionSection}>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>#:</Text>
        <Text style={styles.bodyTextUnbold}>{index+1}</Text>
        </view>
        <Text></Text>
          <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Note Title:</Text>
        <Text style={styles.bodyTextUnbold}>{myList.title}</Text>
        </view>
        <Text></Text>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Company Name:</Text>
        <Text style={styles.bodyTextUnbold}>{myList.company_id}</Text>
        </view>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Product Name:</Text>
        <Text style={styles.bodyTextUnbold}>{myList.product_id}</Text>
        </view>
        <Text></Text>
        <view>
        <Text style={styles.bodyTextBold1}>Content:</Text>
        <Text style={styles.contentText1}>
               {"\n"+myList.content}
              {"\n"}
              </Text>
        </view>
        <Text></Text>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Additional Info:</Text>
        <Text style={styles.bodyTextUnbold}>{myList.additional_info}</Text>
        </view>
        <Text></Text>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Created By:</Text>
        <Text style={styles.bodyTextUnbold}>{myList.user_fullname}</Text>
        </view>
        <Text></Text>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Created At:</Text>
        <Text style={styles.bodyTextUnbold}>{getDatePlease(myList.createdAt)}</Text>
        </view>
        <Text></Text>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Updated By:</Text>
        <Text style={styles.bodyTextUnbold}>{myList.updated_by_user_fullname}</Text>
        </view>
        <Text></Text>
        <view style={styles.bodyTextBold}>
        <Text style={styles.bodyTextBold}>Updated At:</Text>
        <Text style={styles.bodyTextUnbold}>{getDatePlease(myList.updatedAt)}</Text>
        </view>
        <Text></Text> */}

        
          {/* <Text style={styles.bodyText}>
              #: {index+1}
              {"\n"}
              Note Title: {myList.title}
              {"\n"}
              Company Name: {myList.company_id}
              {"\n"}
              Product Name: {myList.product_id}
              {"\n"}
              Content:
              {"\n"}
              </Text>
              </View>
              <Text style={styles.contentText}>
               {"\n"+myList.content}
              {"\n"}
              </Text>
              <View style={styles.conclusionSection}>
              <Text
                style={styles.bodyText}
                >
              
              Additional Info: {myList.additional_info}
              {"\n"}
              Created By: {myList.user_fullname}
              {"\n"}
              Created At: {getDatePlease(myList.createdAt)}
              {"\n"}
              Updated By: {myList.updated_by_user_fullname}
              {"\n"}
              Updated At: {getDatePlease(myList.updatedAt)}
              {"\n"}
              
              <br />
              </Text> */}
        {/* </View>
        </View>
        )} */}
        {/* <View style={styles.bodySection}>
          <Text
            style={styles.bodyTex}
            
            >
             
              EMAIL: {`${JSON.stringify(props.pdf1)}`}</Text>
        </View> */}
        
        
        
        {/* {props.pdf1.map((user) => (
            <View>
        <div>{user}</div>
        </View>
      ))} */}
      
        <br />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
      </Page>
    </Document>
  );
};

export default AdecPdfDownload;