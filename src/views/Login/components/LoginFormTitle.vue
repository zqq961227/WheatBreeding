<template>
  <h2 class="enter-x mb-3 text-center text-2xl xl:text-center xl:text-3xl">
    智慧小麦育种
  </h2>
  <h2 class="enter-x mb-3 text-center text-2xl font-bold xl:text-center xl:text-3xl">
    及生态定位平台
  </h2>
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
    //[LoginStateEnum.LOGIN]: t('智慧小麦育种及生态定位平台'),
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
  //color: linear-gradient(to bottom, rgba(0,193,158,0.9), rgba(0,193,158,0));
   background: linear-gradient(to bottom, rgba(0,193,158,1)50%, rgba(0,193,158,0));
  -webkit-background-clip: text;
  color: transparent;
  
  font-family: Source Han Sans CN;
  font-size: 2.5vw;
  font-weight: 500;
  line-height: 3.1vw;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
</style>
