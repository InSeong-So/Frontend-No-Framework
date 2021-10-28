import { ENTER_KEYCODE } from '../constants/index.js';

export default () => {
  (() => {
    const $div = document.createElement('div');
    $div.classList.add('custom-modal', 'myModal', 'hidden');
    $div.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>메뉴 수정</h2>
        </div>
        <div class="modal-body">
          <form id="file-upload-form" class="uploader">
            <input type="text" name="menu-edit-name"/>
            <input id="file-upload" type="file" name="fileUpload" accept="image/*" />
            <label for="file-upload" id="file-drag">
              <img id="file-image" src="#" alt="Preview" class="hidden">
              <div id="start">
                <i class="fa fa-download" aria-hidden="true"></i>
                <div>Select a file or drag here</div>
                <div id="notimage" class="hidden">Please select an image</div>
                <span id="file-upload-btn" class="btn btn-primary">Select a file</span>
              </div>
              <div id="response" class="hidden">
                <div id="messages"></div>
                <progress class="progress" id="file-progress" value="0">
                  <span>0</span>%
                </progress>
              </div>
            </label>
          </form>
        </div>
        <div class="modal-footer">
          <button class="edit-complete btn btn-primary">등록</button>
        </div>
      </div>
    `;
    document.body.appendChild($div);
    const $target = document.querySelector('#app');
    const $modal = document.querySelector('.myModal');
    const $regist = document.querySelector('.edit-complete');
    const $close = document.querySelector('.close');
    const displayModal = event => {
      if (!(event.target.matches('.open') || event.target.matches('.close')))
        return;
      $modal.classList.toggle('hidden');
    };
    $target.addEventListener('click', displayModal);
    $close.addEventListener('click', displayModal);
    $regist.addEventListener('click', event => {
      const $modalInput = document.querySelector('[name=menu-edit-name]');
      console.log($modalInput);
    });
    // File Upload
    function fileUpload() {
      function Init() {
        console.log('Upload Initialised');
        const fileSelect = document.getElementById('file-upload'),
          fileDrag = document.getElementById('file-drag');
        // submitButton = document.getElementById('submit-button');

        fileSelect.addEventListener('change', fileSelectHandler, false);

        // Is XHR2 available?
        const xhr = new XMLHttpRequest();
        if (xhr.upload) {
          // File Drop
          fileDrag.addEventListener('dragover', fileDragHover, false);
          fileDrag.addEventListener('dragleave', fileDragHover, false);
          fileDrag.addEventListener('drop', fileSelectHandler, false);
        }
      }

      function fileDragHover(e) {
        const fileDrag = document.getElementById('file-drag');

        e.stopPropagation();
        e.preventDefault();

        fileDrag.className =
          e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
      }

      function fileSelectHandler(e) {
        // Fetch FileList object
        const files = e.target.files || e.dataTransfer.files;

        // Cancel event and hover styling
        fileDragHover(e);

        // Process all File objects
        for (let i = 0, f; (f = files[i]); i++) {
          parseFile(f);
          uploadFile(f);
        }
      }

      // Output
      function output(msg) {
        // Response
        const m = document.getElementById('messages');
        m.innerHTML = msg;
      }

      function parseFile(file) {
        console.log(file.name);
        output('<strong>' + encodeURI(file.name) + '</strong>');

        // const fileType = file.type;
        // console.log(fileType);
        const imageName = file.name;

        const isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
        if (isGood) {
          document.getElementById('start').classList.add('hidden');
          document.getElementById('response').classList.remove('hidden');
          document.getElementById('notimage').classList.add('hidden');
          // Thumbnail Preview
          document.getElementById('file-image').classList.remove('hidden');
          document.getElementById('file-image').src = URL.createObjectURL(file);
        } else {
          document.getElementById('file-image').classList.add('hidden');
          document.getElementById('notimage').classList.remove('hidden');
          document.getElementById('start').classList.remove('hidden');
          document.getElementById('response').classList.add('hidden');
          document.getElementById('file-upload-form').reset();
        }
      }

      function setProgressMaxValue(e) {
        const pBar = document.getElementById('file-progress');

        if (e.lengthComputable) {
          pBar.max = e.total;
        }
      }

      function updateFileProgress(e) {
        const pBar = document.getElementById('file-progress');

        if (e.lengthComputable) {
          pBar.value = e.loaded;
        }
      }

      function uploadFile(file) {
        const xhr = new XMLHttpRequest(),
          fileInput = document.getElementById('class-roster-file'),
          pBar = document.getElementById('file-progress'),
          fileSizeLimit = 1024; // In MB
        if (xhr.upload) {
          // Check if file is less than x MB
          if (file.size <= fileSizeLimit * 1024 * 1024) {
            // Progress bar
            pBar.style.display = 'inline';
            xhr.upload.addEventListener(
              'loadstart',
              setProgressMaxValue,
              false,
            );
            xhr.upload.addEventListener('progress', updateFileProgress, false);

            // File received / failed
            xhr.onreadystatechange = function (e) {
              if (xhr.readyState == 4) {
                // Everything is good!
                // progress.className = (xhr.status == 200 ? "success" : "failure");
                // document.location.reload(true);
              }
            };

            // Start upload
            xhr.open(
              'POST',
              document.getElementById('file-upload-form').action,
              true,
            );
            xhr.setRequestHeader('X-File-Name', file.name);
            xhr.setRequestHeader('X-File-Size', file.size);
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.send(file);
          } else {
            output(
              'Please upload a smaller file (< ' + fileSizeLimit + ' MB).',
            );
          }
        }
      }

      // Check for the constious File API support.
      if (window.File && window.FileList && window.FileReader) {
        Init();
      } else {
        document.getElementById('file-drag').style.display = 'none';
      }
    }
    fileUpload();
  })();

  window.addEventListener('keydown', event => {
    if (event.key === ENTER_KEYCODE) event.preventDefault();
  });
};
