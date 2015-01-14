
module.exports = function ScrollbarMxin(timer) {

  return {

    mixins: [EventMixin],

    /**
     * Get scrollbar width.
     * http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
     */
    getScrollBarWidth: function () {
      var inner = document.createElement('p');
      inner.style.width = '100%';
      inner.style.height = '200px';

      var outer = document.createElement('div');
      outer.style.position = 'absolute';
      outer.style.top = '0px';
      outer.style.left = '0px';
      outer.style.visibility = 'hidden';
      outer.style.width = '200px';
      outer.style.height = '150px';
      outer.style.overflow = 'hidden';
      outer.appendChild(inner);

      document.body.appendChild(outer);
      var w1 = inner.offsetWidth;
      outer.style.overflow = 'scroll';
      var w2 = inner.offsetWidth;
      if (w1 == w2) w2 = outer.clientWidth;

      document.body.removeChild(outer);

      return (w1 - w2);
    },

    componentDidMount: function () {
      this.checkWidh();
      this.ticker = setInterval(this.invalidate, timer || 30 * 1000);
    },

    componentWillUnmount: function () {
      if (this.ticker) {
        return clearInterval(this.ticker);
      }
    },

    invalidate: function () {
      if(this.onScrollBarListener) {
        this.onScrollBarListener(this.checkWidh());
      }
    },

    checkWidh: function () {
      var node = this.getDOMNode();
      var rect = node.getBoundingClientRect();
      var offset = window.innerWidth - rect.right;
      if(!this.state.__offset__) {
        return this.setState({
          __offset__: offset
        });
      }
      return Math.abs(offset - this.state.__offset__) === this.getScrollBarWidth();
    }
  }
}
