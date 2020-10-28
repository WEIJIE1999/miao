<template>
<div>
  <el-table
    :data="nowTableDate"
    border
    style="width: 100%">
    <el-table-column
      prop="userHead"
      label="用户头像"
      width="80px">
      <template slot-scope="scope"><img class="userHead" :src="scope.row.userHead" alt=""></template>
    </el-table-column>
    <el-table-column
      prop="data"
      label="注册日期">
      <template slot-scope="scope">{{scope.row.data | dataFormat}}</template>
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="用户邮箱">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope" >
         <el-button type="primary" size='small' icon="el-icon-edit" @click='handleToFreeze(scope.$index,scope.row)'>{{scope.row.isFreeze?'已冻结':'未冻结'}}</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click='handleToDelete(scope.$index,scope.row)'>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 8, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
</div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      tableData: [],
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      }
    }
  },
  mounted () {
    this.axios.get('/api2/admin/userList').then((res) => {
      if (res.data.status === 0) {
        this.tableData = res.data.data.userList
      }
    })
  },
  methods: {
    handleToFreeze (index, row) {
      this.axios.post('/api2/admin/updateFreeze', {
        email: row.email,
        isFreeze: !row.isFreeze
      })
        .then((res) => {
          if (res.data.status === 0) {
            this.tableData[index].isFreeze = !row.isFreeze
            this.$message.success('修改成功')
          } else {
            this.$message.erro('修改失败')
          }
        })
    },
    async handleToDelete (index, row) {
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).catch(err => err)
      // 如果用户确定删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串cancel
      if (confirmResult !== 'confirm') return this.$message.info('取消了删除')
      this.axios.post('/api2/admin/deleteUser', { email: row.email }).then((res) => {
        if (res.data.status === 0) {
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        } else {
          this.$message.erro('删除失败')
        }
      })
    },
    // 页码参数数量改变事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    // 页码值改变事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    }
  },
  computed: {
    nowTableDate () {
      return this.tableData.slice((this.queryInfo.pagenum - 1) * this.queryInfo.pagesize, this.queryInfo.pagenum * this.queryInfo.pagesize) || []
    }
  }
}
</script>

<style scoped>
.page{margin-top:20px ;}
.userHead{width: 50px;height: 50px;border-radius: 50%; overflow: hidden;margin: 8px;}
</style>
