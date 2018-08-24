<template>
    <div id="upload">
        <el-upload
            v-loading="loading"
            ref="upload"
            :action="action"
            :auto-upload="autoUpload"
            :before-upload="beforeUpload"
            :list-type="listType"
            :multiple="multiple"
            :show-file-list="showFileList"
            :limit="limit"
            :on-exceed="handleExceed"
            :http-request="overlayRequest"
            :file-list="fileList"
        >
            <el-button
                slot="trigger"
                type="primary"
            >{{uploadBtn}}</el-button>
            <el-button
                v-if="!autoUpload"
                style="margin-left: 10px;"
                type="warning"
                @click="submitUpload"
            >{{confirmBtn}}</el-button>
            <div slot="tip" class="el-upload__tip">
                <slot name="uploadTip"></slot>
            </div>
        </el-upload>
    </div>
</template>
<script>
    import * as Utils from '../utils';

    export default {
        name: 'upload',
        props: {
            action: {
                default: '',
            },
            autoUpload: {
                type: Boolean,
                default: false,         // 是否选取文件之后自动上传，false时候会出现确认上传的button
            },
            fileType: {
                default: '',
            },
            fileSize: {
                type: Number,
                default: 0
            },
            listType: {                 // 上传的文件列表显示类型 包括picture，text等
                default: 'text'
            },
            multiple: {                   // 是否支持同时选取多个文件
                type: Boolean,
                default: false,
            },
            showFileList: {                //  是否显示上传文件列表
                type: Boolean,
                default: false,
            },
            limit: {                        // 上传文件数量限制
                default: 1,
            },
            handleExceed: {                  // 上传文件数量限制超出之后的回调
                type: Function,
            },
            handleSubmit: {                  // 非自动上传点击确认之后的回调函数
                type: Function,
            },
            uploadBtn: {                    // 点击上传的文字
                default: '上传主图',
            },
            confirmBtn: {                    // 非自动上传点击确认btn的文字
              default: '确认上传',
            },
            fileList: {                     // 要上传的文件列表 设置了action而且是自动上传才有效
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                loading: false,
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();       //  这里会触发覆盖的上传接口
            },
            beforeUpload(file) {
                const isPIC = file.type === 'image/jpeg' || file.type === 'image/png';
                const isOverSize = this.fileSize > 0 && (file.size / 1024 / 1024 > this.fileSize);

                switch (this.fileType) {
                    case 'pic':
                        if (!isPIC) {
                            // this.$message.error('只能上传图片文件!');
                            this.$alert('只能上传图片文件！', '消息提示', {confirmButtonText: '确定'});
                            return false;
                        }
                    // TODO
                    default:
                        break;
                }
                if (isOverSize) {
                    this.$alert(`上传文件大小不能超过${this.fileSize}MB`, '消息提示', {confirmButtonText: '确定'});
                    return false;
                }
                return true;
            },
            overlayRequest(req) {           // 覆盖默认上传的逻辑
                if (this.handleSubmit) {

                    this.handleSubmit(req);

                } else {
                    let file = req.file;
                    this.loading = true;
                    Utils.uploadImage(file).then(url => {
                        this.loading = false;
                        this.$refs.upload.clearFiles();
                        this.$emit('uploadSuccess', url);
                    }).catch(() => {
                        this.loading = false;
                        this.$emit('uploadError');
                    })
                }
            }
        },
    }
</script>