<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10">
            <el-button type="primary" style="margin-left:10px" size="small" icon="el-icon-plus" @click="xinzeng">新增角色</el-button>
          </el-row>
          <el-table
            v-loading='loading'
            :data="roleList"
            style="width: 100%"
            border
          >
            <el-table-column type="index" label="序号" width="120" />
            <el-table-column prop="name" label="名称" width="240" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="edit(scope)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRow(scope.index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row :gutter="10" type="flex" justify="end" align="middle" style="height:60px">
            <el-pagination
              v-if="total>0"
              background
              layout="prev, pager, next , sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,3,5,10]"
              @current-change='getRoleList'
              @size-change='getRoleList'
            >
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <add-role ref="addRole" :dialogVisible.sync='dialogVisible' @refreshList='getRoleList'></add-role>
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import { mapGetters } from 'vuex'
import addRole from './compoents/addRole.vue'
export default {
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false,
      formData: {
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
  },
  created() {
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
        if (total > 0 && this.roleList.length === 0) {
          this.page.page = this.page.page--
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    xinzeng() {
      this.dialogVisible = true
    },
    edit(scope) {
      console.log(scope.row)
      this.$refs.addRole.formData = { ...scope.row }
      this.dialogVisible = true
    },
    async delRow(id) {
      try {
        this.$confirm('确认取消吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRoleList()
      } catch (can) {
        console.log(can)
      }
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
      console.log(this.formData.name)
    }
  }
}
</script>

<style>

</style>
