let upload = (function(){
    "use strict";
    
    let module = {};
       /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    module.uploadFile(file, signedRequest, url){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            //document.getElementById('preview').src = url;
            //document.getElementById('avatar-url').value = url; 
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    module.getSignedRequest(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    };
    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
    module.initUpload(id){
      const files = document.getElementById(id).files;
      const file = files[0];
      if(file == null){
        return alert('No file selected.');
      }
      module.getSignedRequest(file);
    }
    /*
     Bind listeners when the page loads.
    
    (() => {
        document.getElementById('file-input').onchange = initUpload;
    })();
*/
    
    return module;
}());
