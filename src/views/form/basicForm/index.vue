<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title="false" :content="$t('form.basic-form.basic.description')">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          :label="$t('form.basic-form.title.label')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: $t('form.basic-form.title.required') }] }]"
            name="name"
            :placeholder="$t('form.basic-form.title.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.date.label')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-range-picker
            name="buildTime"
            style="width: 100%"
            v-decorator="['buildTime', { rules: [{ required: true, message: $t('form.basic-form.date.required') }] }]"
          />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.invites.label')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          :required="true"
        >
          <!-- <a-input :placeholder="$t('form.basic-form.invites.placeholder')" /> -->
          <a-select default-value="通知" style="width: 120px" @change="handleMenuClick">
            <a-select-option value="xiaoyuan"> 校园通知 </a-select-option>
            <a-select-option value="zuoye"> 作业通知 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="formData.aaa == 'xiaoyuan'"
          label="校园通知"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-textarea
            rows="4"
            :placeholder="$t('form.basic-form.goal.placeholder')"
            v-decorator="['description', { rules: [{ required: true, message: $t('form.basic-form.goal.required') }] }]"
          />
        </a-form-item>
        <a-form-item
          v-else
          :label="$t('form.basic-form.goal.label')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-textarea
            rows="4"
            :placeholder="$t('form.basic-form.goal.placeholder')"
            v-decorator="['description', { rules: [{ required: true, message: $t('form.basic-form.goal.required') }] }]"
          />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary">{{ $t('form.basic-form.form.submit') }}</a-button>
          <a-button style="margin-left: 8px">{{ $t('form.basic-form.form.save') }}</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'BaseForm',
  data() {
    return {
      form: this.$form.createForm(this),
      formData: {
        aaa: 'xiaoyuan',
      },
    }
  },
  methods: {
    handleMenuClick(value) {
      this.formData.aaa = value
    },
    handleButtonClick(e) {
      console.log('click left button', e)
    },
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>
