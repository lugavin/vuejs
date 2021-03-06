import Vue from 'vue';

const template = `
  <div>
    <div class="modal fade show" role="dialog" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
          </div>
          <div class="modal-body">
            <div class="h5" role="alert">{{ msg }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="callback(false)" v-if="type==='confirm'">取消</button>
            <button type="button" class="btn btn-primary" @click="callback(true)">确定</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade show"></div>
  </div>
`;

const TYPE = { ALERT: 'alert', CONFIRM: 'confirm' };

function notify(msg, type, callback) {
  const Dialog = Vue.extend({
    template,
    data() {
      return {
        msg,
        type,
        title: '提示消息'
      };
    },
    methods: {
      callback(yes) {
        if (typeof callback === 'function') {
          if (type === 'confirm') {
            callback(yes);
          } else {
            callback();
          }
        }
        this.close();
      },
      close() {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  });
  const dialog = new Dialog();
  const appendTo = document.createElement('template');
  document.body.appendChild(appendTo);
  dialog.$mount(appendTo);
}

function alert(msg, callback) {
  notify(msg, TYPE.ALERT, callback);
}

function confirm(msg, callback) {
  notify(msg, TYPE.CONFIRM, callback);
}

export default { alert, confirm };
