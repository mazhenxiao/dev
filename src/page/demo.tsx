import { defineComponent, reactive } from 'vue';
import SchemaForm, { SchemaFType } from '@/components/schema-control/schema-form';
import styles from './demo.module.less';
import { Maybe } from '@/utils/ts-helper';

export type LoginFormState = {
  /**
   * 用户名
   */
  phone: string;
  /**
   * 密码
   */
  password: string;
};

const schemaForm: SchemaFType<LoginFormState> = {
  formName: 'login',
  ruleRefs: {
    phone: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
  },
  formItems: [
    {
      controlType: 'Input',
      keyId: 'phone',
      label: '用户名',
    },
    {
      controlType: 'Input',
      keyId: 'password',
      label: '密码',
    },
  ],
};

/**
 * 登录页面
 * @returns
 */
const Login = defineComponent(() => {
  const formState = reactive<{ data: Maybe<LoginFormState> }>({ data: undefined });
  return () => (
    <div class={styles.layout}>
      demo
      <SchemaForm v-model={formState} schema={schemaForm as any}></SchemaForm>
    </div>
  );
});
export type LoginType = typeof Login;
export default Login;
