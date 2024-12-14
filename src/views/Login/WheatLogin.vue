<template>
  <div :class="prefixCls" class="relative h-[100vh] flex justify-center items-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('@/assets/svgs/wheat_login.svg')">
    </div>
    
    <!-- 登录框 -->
    <div class="relative z-10 p-6 rounded-lg bg-white shadow-lg w-full sm:w-96 bg">
      <LoginForm class="m-auto" />
      <!-- 你可以在这里添加其他的登录方式，比如 MobileForm, QrCodeForm 等 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/store/modules/app'
import { ThemeSwitch } from '@/layout/components/ThemeSwitch'
import { LocaleDropdown } from '@/layout/components/LocaleDropdown'

import { LoginForm, MobileForm, QrCodeForm, RegisterForm, SSOLoginVue } from './components'

defineOptions({ name: 'WheatLogin' })

const { t } = useI18n()
const appStore = useAppStore()
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('login')
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-login;

.#{$prefix-cls} {
  position: relative;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  
  /* 背景 */
  &::before {
    position: absolute;
    z-index: -1;
    background-image: url('@/assets/svgs/wheat_login.svg');
    background-position: bottom;;
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
    inset: 0;
  }
  
  /* 登录框 */
  // .login-form-container {
  //   width: 100%;
  //   max-width: 800px; /* 最大宽度，调整登录框大小 */
  //   padding: 20px;
  //   background-color: rgb(255 255 255 / 90%); /* 半透明背景 */
  //   border-radius: 12px;
  //   box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
  // }
  .bg{
    background: rgba(255,255,255,0.8) !important;
    position: absolute;
    // border: 4px solid;
    border-top: 4px solid rgba(0,193,158,1);
    border-left: 4px solid rgba(0,193,158,1);
    border-right: 4px solid rgba(0,193,158,1);
    border-bottom: transparent;
    width: 33.6vw;
    min-width: 200px;
    height: 39vw;
    top: 8vw;
    left: 16vw;
    gap: 0px;
    border-radius: 20px;
    // border-image-source: linear-gradient(to bottom, rgba(0,193,158,1), rgba(255, 255, 255, 0));
    // border-image-slice: 1;
    // border-image-repeat: stretch;
  } 
}
</style>
