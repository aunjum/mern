import Papa from 'papaparse';
import CSVAPI from './CSVAPI';
const HandleCSV = async (projectName, projectId) => {
    
    const res = CSVAPI(projectId);
    if(!res) {return}

    if(projectId !== null || projectId !== "" || typeof projectId !== "undefined") {
      // Convert the data into an array of objects
      const rows = res?.body?.map((item) => {
        return {
          TrackID: item.device_tag.substring(item.device_tag.indexOf(".") + 1),
          DeviceVendor: item.vendor,
          DeviceModel: item.model,
          DeviceSerial: item.serial,
          Memo: item.state
        };
      });
      // Convert the array of objects into a CSV string
      const csv = Papa.unparse(rows);
      // Create a URL that points to the CSV string
      const url = window.URL.createObjectURL(new Blob([csv]));
      // Create a link that allows the user to download the CSV file
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName}_TRACKID_LIST_${Date.now()}.csv`;
      link.click();
    } else {return}
  }

  export default HandleCSV;