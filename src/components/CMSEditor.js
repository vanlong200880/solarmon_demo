import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Libs from '../utils/Libs';
import FileUploadService from '../services/FileUploadService';
import Constants from '../utils/Constants';

class CMSEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      readonly: false
    };
    this.tinymceEditor = null;
    this._editor = null;
  }

  render() {
    var { id, content, readonly, name, label, required, height } = this.props;
    return (
      <div className="main-editor">
        <input type="file" id="image-upload-tinymce" name="single-image" style={{ display: "none" }} accept="image/png, image/gif, image/jpeg, image/jpg, image/svg" />
        {!Libs.isBlank(label) ? <label className="control-label">{label}
          {required ? <span className="required">*</span> : ''}
        </label> : ''}

        <Editor
          textareaName={name}
          disabled={readonly}
          initialValue={(content) ? content : ""}
          tinymceScriptSrc='/libs/tinymce/tinymce.min.js'
          onInit={(evt, editor) => this._editor = editor}
          init={{
            selector: '#' + id,
            height: height ? height : 200,
            menubar: true,
            readonly: readonly,
            statusbar: false,
            relative_urls: false,
            remove_script_host: false,
            convert_urls: false,
            paste_data_images: true,
            file_browser_callback_types: 'image',
            file_picker_callback: (callback, value, meta) => {
              if (meta.filetype === 'image') {

                var input = document.getElementById('image-upload-tinymce');
                input.click();

                let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
                if (!Libs.isBlank(info)) {
                  try {
                    let userInfo = JSON.parse(Libs.base64Decrypt(info));
                    input.onchange = () => {
                      var file = input.files[0];
                      var reader = new FileReader();

                      reader.onload = (e) => {
                        var img = new Image();
                        var param = {
                          file_name: file.name,
                          file_upload: reader.result,
                          id_company: userInfo.id_company,
                          id_language: userInfo.id_language,
                          iso_code: userInfo.iso_code,
                          iso_code_language: userInfo.lang,
                          config_thumb_folder_new: userInfo.config_thumb_folder_new,
                          config_thumb_folder_pro: userInfo.config_thumb_folder_pro,
                          config_thumb_new_h: userInfo.config_thumb_new_h,
                          config_thumb_pro_h: userInfo.config_thumb_pro_h,
                          config_thumb_pro_w: userInfo.config_thumb_pro_w,
                          config_cdn: userInfo.config_cdn
                        }

                        FileUploadService.instance.saveUploadImage(param, function (status, data, msg) {
                          if (status && data && !Libs.isBlank(data.file_url)) {
                            img.src = data.file_url; // reader.result;
                            callback(data.file_url, { alt: file.name });
                          }
                        }, true);
                      };

                      reader.readAsDataURL(file);
                    };

                  } catch (e) {

                  }
                }
              }
            },
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
              'bold italic forecolor backcolor emoticons | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help | table | link image',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

            setup: editor => {
              this._editor = editor;
              editor.on('keyup change', () => {
                const content = editor.getContent();
                this.props.onEditorChange(content, editor);
              });
              //     if (_this.props.onRegistered) {
              //       _this.props.onRegistered(editor, _this);
              //     }
            }

          }}
          onEditorChange={this.props.onEditorChange}
        />

      </div>
      //       <div className="main-editor">
      //         <input type="file" id="image-upload-tinymce" name="single-image" style={{ display: "none" }} accept="image/png, image/gif, image/jpeg, image/jpg, image/svg" />
      //         {!Libs.isBlank(label) ? <label className="control-label">{label}
      //           {required ? <span className="required">*</span> : ''}
      //         </label> : ''}
      //         <Editor
      //           // apiKey={Constants.TINY_API_KEY}
      //           id={id}
      //           tinymceScriptSrc='/libs/tinymce/tinymce.min.js'
      //           textareaName={name}
      //           disabled={readonly}
      //           initialValue={(content) ? content : ""}
      //           init={this.state.init}
      //           onEditorChange={this.props.handleEditorChange}
      //         />
      //       </div>


    );
  };
}
export default CMSEditor;
