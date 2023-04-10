import React, {useState,useRef} from 'react';
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {PDFDownloadLink} from "@react-pdf/renderer";
import QrCodePdfDownload from '../../Template/QrCodePdf';
import ConvertQRCode from '../../Converter/ConvertQRCode';

const QrCodePdfButton = (props) => {

    const [renderePDF_link, setRenderePDF_link] = useState(false);
    const btnQrPDFAuto = useRef(null);
    let isPdfButtonClicked = false;

    const handleQrCodePdf = async (projectId) => {
        console.log('==========handleQrCodePdf starts==========');
    
        if(projectId == null) {return}
    
        // process 1
        // get data -> convert -> store
        console.log('==========handleQrCodePdf starts process 1==========');
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showAllActiveDevicesOfFollowingProject', {
            method: 'POST',
            body: JSON.stringify({
            project_id : projectId
            }),
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
        });
        if(!response) {return}
        const _qRData = await response.json(); // get
        if(!_qRData) {return}

        _qRData?.body?.map(async (item) => {
          const tag = item.device_tag; //track+device
          const dotIndex = tag.indexOf(".");
          const track = tag.substring(dotIndex + 1);
          // device = tag.substring(0, dotIndex);
          ConvertQRCode(track);
        });

        setRenderePDF_link((prevvalue) => {
            if(prevvalue) {
                setTimeout(() => {
                    if(!isPdfButtonClicked) {
                    btnQrPDFAuto.current.click();
                    isPdfButtonClicked = !isPdfButtonClicked;
                    setTimeout(() => {
                        setRenderePDF_link((prevvalue) => {
                        if(prevvalue) {
                            isPdfButtonClicked = false;
                            return false;
                        }
                        });
                    }, 6000);
                    }
                }, 6000);
                return true;
        }
        });
      }

    return (
        <div>
        <Button
                    value={props.projectId}
                    onClick={() => {handleQrCodePdf(props.projectId)}}>
                      <PictureAsPdfIcon />
                </Button>
                  {
                      renderePDF_link && 
                      <PDFDownloadLink
                      document={<QrCodePdfDownload/>}
                      fileName={`${props.projectName}_QR_LIST_${Date.now()}.pdf`}>
                        {
                          <Button ref={btnQrPDFAuto}></Button>
                        }
                      </PDFDownloadLink>
                    
                  }
                  </div>
    );
}

export default QrCodePdfButton;