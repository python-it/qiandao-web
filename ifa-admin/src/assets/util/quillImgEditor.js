/**
 *
 *
 * @vue-quill文本编辑器base64图片处理
 * @param {*} quill
 */
export function quillEditorImgToForm(quill) {
    let _this = this;
    let toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', function() {
        let fileInput = quill.container.querySelector('input.ql-image[type=file]');
        if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', function() {
                if (fileInput.files != null && fileInput.files[0] != null) {
                    if (_this.uploadImg) {
                        let file = fileInput.files[0];
                        // console.log(file);
                        let fd = new FormData();
                        fd.append('editor', 'true');
                        fd.append('file', file);
                        let request = new XMLHttpRequest();
                        request.open("POST", _this.uploadImg, true);
                        request.setRequestHeader('token', _this.token);
                        request.onreadystatechange = function() {
                            if (request.readyState === 4 && request.status === 200) {
                                let res = JSON.parse(request.responseText);
                                if (res.code == 0) {
                                    let range = quill.getSelection(true);
                                    quill.insertEmbed(range.index, 'image', res.data.base + res.data.path); //这里的res.fullUrl为后端返回的字段，可根据项目自行修改
                                    quill.setSelection(range.index + 1, 0)
                                    fileInput.value = "";
                                } else {
                                    _this.$message({
                                        title: '提示',
                                        type: 'error',
                                        message: res.desc,
                                        duration: 2000,
                                        onClose: () => {}
                                    });
                                }
                            } else if (request.readyState === 4) {
                                console.error(request);
                            }         
                        };
                        request.send(fd);
                    } else {
                        let reader = new FileReader();
                        reader.onload = function(e) {
                            let range = quill.getSelection(true);
                            quill.insertEmbed(range.index, 'image', e.target.result);
                            quill.setSelection(range.index + 1, 0)
                            fileInput.value = "";
                        };
                        reader.readAsDataURL(fileInput.files[0]);
                    }
                }
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    });
}