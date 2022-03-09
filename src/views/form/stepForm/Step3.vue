<template>
  <div>
    <a-form>
      <a-result title="操作成功" :is-success="true" sub-title="预计两小时内到账" style="max-width: 560px; margin: 40px auto 0;">
      </a-result>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step3',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    finish () {
      this.$emit('finish')
    },
    toOrderList () {
      this.$router.push('/list/table-list')
    }
  }
}
</script>
<style lang="less" scoped>
  .information {
    line-height: 22px;

    .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .money {
    font-family: "Helvetica Neue",sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
</style>
