class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
      this.$fragmengt = this.node2Fragment(this.$el)
      this.compile(this.$fragmengt)
      this.$el.appendChild(this.$fragmengt)
    }
  }
  node2Fragment(el) {
    const fragment = document.createDocumentFragment();
    let child;
    while ((child = el.firstChild)) {
      fragment.appendChild(child)
    }
    return fragment;
  }
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isInterpolation(node)) {
        this.compileText(node)
      } else if (this.isElement(node)) {
        this.compileElement(node)
      }
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  isElement(node) {
    return node.nodeType === 1;
  }
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText(node) {
    const key = RegExp.$1;
    this.update(node, this.$vm, key, "text")
  }
  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const key = attr.value;
      if (attrName.startsWith('k-')) {
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, this.$vm, key)
      } else if (attrName.startsWith("@")) {
        const evenetName = attrName.substring(1);
        this.eventHander(node, this.$vm, key, evenetName)
      }
    })
  }
  eventHander(node, vm, key, name) {
    const fn = vm.$options.methods && vm.$options.methods[key]
    if (name && fn) {
      node.addEventListener(name, fn.bind(vm))
    }
  }
  update(node, vm, key, dir) {
    const fn = this[dir + 'Updator']
    fn && fn(node, vm[key])
    new Watcher(vm, key, function () {
      fn && fn(node, vm[key])
    })
  }
  text(node, vm, key) {
    this.update(node, vm, key, "text")
  }
  html(node, vm, key) {
    this.update(node, vm, key, "html")
  }
  model(node, vm, key) {
    this.update(node, vm, key, "model")
    node.addEventListener("input", e => {
      vm[key] = e.target.value
    })
  }
  textUpdator(node, value) {
    node.textContent = value
  }
  modelUpdator(node, value) {
    node.value = value
  }
  htmlUpdator(node, value) {
    node.innerHTML = value
  }
}