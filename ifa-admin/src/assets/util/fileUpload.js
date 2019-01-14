
export function fileImg(obj) {
    let _this = this;
    const fileDom = document.getElementById(obj.fileId);
    const imgLists = document.getElementById("lw_preview");
    const imgWidth = obj.width ? obj.width : 0;
    const imgHeight = obj.height ? obj.height : 0;
    const judge = obj.distinguish ? obj.distinguish : '';
    const errorTip = ()=>{
        _this.$message({
            message: '图片尺寸不符合规定',
            type: 'warning',
            duration: 2000
        });
    };

    fileDom.onchange = function(event) {
        let files = event.target.files || event.dataTransfer.files;
        let _fileurl = files[0];
        if (!files.length > 0) return;
        let name = files[0].name;
        let reader = new FileReader();
        reader.onload = function(readerData) {
            let img = new Image();
            img.onload = function() {
                /* 广告,生日,节日 */
                if(judge.indexOf('admanage')!=-1 || judge.indexOf('birthmanage')!=-1 || judge.indexOf('festmanage')!=-1){
                    if (img.width != imgWidth || img.height != imgHeight) {
                        errorTip();
                        return;
                    };
                }else{
                    if (img.width/img.height != imgWidth/imgHeight) {
                        errorTip();
                        return;
                    };
                };

                let canvas = document.createElement('canvas');
                let cans = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                cans.clearRect(0, 0, canvas.width, canvas.height);
                cans.drawImage(img, 0, 0, img.width, img.height);
                /*bese64*/
                // let data = canvas.toDataURL();
                 
                /* form表单请求 */
                let fd = new FormData();
                fd.append('file', _fileurl);
                let request = new XMLHttpRequest();
                request.open("POST", _this.uploadImg, true);
                request.setRequestHeader('token', _this.token);
                request.onreadystatechange = function() {
                    if(request.readyState === 4 && request.status === 200) {
                        let res = JSON.parse(request.responseText);
                        if(res.code == 0){
                            if (!(_this.ruleForm.fileList.length >= parseInt(obj.size))) {
                                let imgFile = document.createElement('img');
                                // imgFile.src = data;
                                _this.ruleForm.fileList.push({
                                    url: res.data.base + res.data.path,
                                    name: name
                                });
                                /* 重新校验图片length是否为零 ，清除初始校验报错信息！*/
                                _this.$refs.ruleForm.validateField('fileList');
                                // console.log( _this.ruleForm.fileList);
                            } else {
                                _this.$message({
                                    message: `最多允许上传${obj.size}张图片`,
                                    type: 'warning',
                                    duration: 2000
                                });
                            }
                        }else{
                            _this.$message({
                                title: '提示',
                                type: 'error',
                                message: res.desc,
                                duration: 2000,
                                onClose: () => {}
                            });
                        }
                    } else if(request.readyState === 4) {
                        console.error(request);
                    }
                }
                request.send(fd);

                // if (!(_this.ruleForm.fileList.length >= parseInt(obj.size))) {
                //     let imgFile = document.createElement('img');
                //     imgFile.src = data;
                //     _this.ruleForm.fileList.push({
                //         url: data,
                //         name: name
                //     });
                //     /* 重新校验图片length是否为零 ，清除初始校验报错信息！*/
                //     _this.$refs.ruleForm.validateField('fileList');
                //     console.log( _this.ruleForm.fileList);
                // } else {
                //     _this.$message({
                //         message: `最多允许上传${obj.size}张图片`,
                //         type: 'warning',
                //         duration: 1200
                //     });
                // }

            };
            img.src = readerData.target.result;
            fileDom.setAttribute('type','text'); 
            fileDom.setAttribute('type','file');
        };
        reader.readAsDataURL(files[0]);
    }
}