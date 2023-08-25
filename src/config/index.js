export default {
    phonePatt: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    emailPatt: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    GENDER_STR: {
        'man': '男',
        'female': '女',
        'other': '其他',
    },
    GENDER_OPT: [
        { title: '男', value: 'man'},
        { title: '女', value: 'female'},
        { title: '其他', value: 'other'},
    ],
}