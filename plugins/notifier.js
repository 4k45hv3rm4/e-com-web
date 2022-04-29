
export default ({ app, store }, inject) => {
    inject('notifier', {
      showMessage ({ text = '', color = '', timeout=3000 }) {
        store.dispatch('snackBar/showSnack', { text, color, timeout })
      }
    })  
  }