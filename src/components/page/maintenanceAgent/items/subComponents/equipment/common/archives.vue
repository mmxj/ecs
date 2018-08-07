<style type="text/css" lang="less">
  .archives_wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 1px;
    bottom: 1px;
    overflow-y: auto;
    padding: 15px;
    border-right: 1px solid #D1E3E2;
    border-bottom: 1px solid #D1E3E2;
  }
  
  .archives {
    background: #FEFEFE;
    /*margin: 15px;*/
    h4.blockHeader {
      width: 100%;
      height: 34px;
      line-height: 34px;
      border: 1px solid #D1E3E2;
      background: #EEF6F6;
      padding-left: 15px;
      color: #1F2D3D;
      font-size: 14px;
      font-weight: bolder;
      margin: 0;
    }
    div.blockBody {
      background: #FCFCFC;
      border: 1px solid #D1E3E2;
      border-top: 0;
      padding: 0 15px;
      ul.row_wrap {
        width: 100%;
        padding: 10px 15px;
        border-bottom: 1px solid #D1E3E2;
        
        li.row_info {
          width: 45%;
          font-size: 14px;
          color: #1F2D3D;
           list-style: none;
        }
        li.row_info:last-child {
          width: 10%;
        }
      }
      ul.row_wrap:last-child {
        border-bottom: none;
       
      }
      row_wrap_2 {}
      .NameplatePhotos {
        /*margin: 10px;*/
      }
      .img_wrap {
        width: 150px;
        height: 100px;
        border: 1px solid #D1E3E2;
        border-radius: 5px;
        img {
          width: 150px;
          height: 100px;
        }
      }
      span.selec_pd {
        color: #1F2D3D;
        font-size: 14px;
      }
    }
    div.blockBody_img {
      padding: 15px;
    }
    div.noDataInfo {
      text-align: center;
      width: 100%;
    }
  }
</style>
<template>
  <div class="archives_wrap">
    <div class="archives">
      <h4 class="blockHeader">
				设备使用文档（可供下载）
			</h4>
      <div class="blockBody file_list">
        <ul style="background-position: 0 50%;padding: 10px 22px;"  :class="item.Format" v-for="item in archivesData.Attachments" class="row_wrap clearfix">
          <li class="row_info pull-left">{{item.FileName}}</li>
          <li class="row_info pull-left">
            <a :href="item.FilePath"><i class="fa fa-download text-success OperatorDownload" style="font-size: 16px;"></i></a>
          </li>
        </ul>
        <div style="padding: 15px;" class="noDataInfo" v-if="archivesData.Attachments.length==0">暂无数据</div>
      </div>
    </div>
    <div class="archives" style="margin: 15px 0;">
      <h4 class="blockHeader">
				名牌信息
			</h4>
      <div class="blockBody">
        <el-form class="row_wrap row_wrap_2 clearfix" ref="formItems1" label-width="100px" label-position="right" style="display: block;width: 600px; ">
          <el-form-item v-for="item in archivesData.NameplateInfo" :label="item.Key+':'" style="margin-bottom: 0px;width: 300px;" class=" pull-left">
            <span class="selec_pd">{{item.Value}}</span>
          </el-form-item>
        </el-form>
        <el-form v-if="archivesData.NameplatePhotos.length!=0 || archivesData.NameplateInfo.length!=0" class="row_wrap row_wrap_2 clearfix" ref="formItems2" label-width="100px" label-position="right" style="display: block;width: 700px;">
          <el-form-item ref="formItems2" label="名牌图片:" style="margin-bottom: 0px; " class="">
            <div class="NameplatePhotos clearfix">
              <div v-for="item in archivesData.NameplatePhotos" style="margin: 10px;" class="img_wrap pull-left">
                <img class="EquipmentPhotos" :src="item.ResourceUrl" />
              </div>

            </div>
            <span v-if="archivesData.NameplatePhotos.length==0  && archivesData.NameplateInfo.length!=0">暂无数据</span>
          </el-form-item>
        </el-form>
        <div style="padding: 15px;" class="noDataInfo" v-if="archivesData.NameplatePhotos.length==0 && archivesData.NameplateInfo.length==0">
          	暂无数据
        </div>
      </div>
    </div>
    <div class="archives">
      <h4 class="blockHeader">
				设备图片
			</h4>
      <div class="blockBody blockBody_img">
        <div v-for="item in archivesData.EquipmentPhotos" class="img_wrap">
          <img class="EquipmentPhotos" :src="item.ResourceUrl" />
        </div>
        <div class="noDataInfo" v-if="archivesData.EquipmentPhotos.length==0">暂无数据</div>
      </div>
    </div>
  </div>

  <!--<div class="col-md-12" style="padding: 15px">
        <h4 class="m-t-0 m-b-20 header-title">设备使用文档（可供下载）</h4>
        <ul class="list-unstyled transaction-list m-r-5">
            <li v-for="item in archivesData.Attachments">
                <span class="tran-text" style="line-height: 30px;">{{item.FileName}}</span>
                <a :href="item.FilePath"><i class="fa fa-download text-success OperatorDownload" style="font-size: 16px;"></i></a>
                <span class="clearfix"></span>
            </li>
        </ul>
        <h4 class="m-t-0 m-b-20 header-title">铭牌信息</h4>
        <div class="bg-white mt-10">
            <table class="table-bordered table table-hover" style="display: table;">
                <tbody>
                <tr v-for="item in archivesData.NameplateInfo">
                    <td style="padding: 10px 5px;">{{item.Key}}</td>
                    <td style="padding: 10px 5px;">{{item.Value}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <h4 class="m-t-0 m-b-20 header-title">设备图片</h4>
        <div class="uploader_img_nameplate eos_uploader_img">
            <ul class="filelist clearfix">
                <li class="item" v-for="item in archivesData.EquipmentPhotos">
                    <p class="imgWrap">
                        <img :src="item.ResourceUrl"/>
                    </p>
                </li>
            </ul>
        </div>
    </div>-->
</template>
<script>
  export default {
    data: function() {
      return {
        eventData: '',
        archivesData:{
        	Attachments:[],
        	EquipmentPhotos:[],
        	NameplateInfo:[],
        	NameplatePhotos:[]
        	
        }
      }
    },
    props: ['propsData'],
    watch: {
      propsData: {
        handler(val, oldVal) {
          this.getArchives();
        },
        deep: true
      }
    },
    methods: {
      getArchives: function() {
        var _this = this;
        var url = eosCommon.ENTERPRISE_API + 'api/equipment/Archives';
        var params = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "EquipmentId": this.propsData.EquipmentId
          }
        }
        eosCommon.eosAjax(url, "GET", params, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            _this.archivesData = result.Data;
          }
        });
      }
    },
    updated: function() {
      eosCommon.eosOperators(eosCommon.eosOperDataHandle());
    },
    mounted: function() {
      this.getArchives();
    }
  }
</script>
<style>

</style>