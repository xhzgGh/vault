import Mock from 'mockjs';

const listInfo = Mock.mock('/list', 'post', () => {
    const template = {
        'string|4': '@character("upper,lower")'
    };
  const ret = Mock.mock({ hash: template, form: template, to: template });
  return {
    status: 200,
    data: ret,
  };
});

export { listInfo };
