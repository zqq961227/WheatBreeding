<template>
  <h2 class="enter-x mb-3 text-left text-2xl xl:text-center xl:text-3xl">
    智慧小麦育种
  </h2>
  <h2 class="enter-x mb-3 text-left text-2xl xl:text-center xl:text-3xl">
    及生态定位平台
  </h2>
  
  <!-- <h2 class="enter-x mb-3 text-center text-2xl font-bold xl:text-center xl:text-3xl">
    {{ getFormTitle }}
  </h2> -->
</template>
<script lang="ts" setup>
import { LoginStateEnum, useLoginState } from './useLogin'

defineOptions({ name: 'LoginFormTitle' })

const { t } = useI18n()

const { getLoginState } = useLoginState()

const getFormTitle = computed(() => {
  const titleObj = {
    [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
    // [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
    [LoginStateEnum.LOGIN]: t('智慧小麦育种'),
    [LoginStateEnum.LOGINQIAN]: t('及生态定位平台'),
    [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
    [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
    [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
    [LoginStateEnum.SSO]: t('sys.login.ssoFormTitle')
  }
  return titleObj[unref(getLoginState)]
})
</script>
<style lang="scss" scoped>
h2 {
  color: #14c5a3;
}
</style>
