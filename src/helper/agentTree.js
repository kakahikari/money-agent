export class AgentTreeNode {
  constructor (id, name = '', parent = '') {
    this.id = id
    this.name = name
    this.parent = parent
    this.children = []
  }
  hasChild (node) {
    return node.children.lenth < 1
  }
}

export class AgentTree {
  constructor () {
    this.root = new AgentTreeNode('0')
    this.noParent = []
    this.options = []
  }

  search (id) {
    // return node
    if (this.root === null) return null
    else {
      return this.traversal(this.root, id)
    }
  }

  traversal (node, id) {
    // console.log(node.id + ' vs ' + id)
    if (node.id === id) {
      // console.log('find')
      return node
    } else {
      let result = null
      node.children.forEach((childNode) => {
        let temp = this.traversal(childNode, id)
        if (temp !== null) result = temp
      })
      return result
    }
  }

  noParentRemove (node) {
    this.noParent.forEach((noParentNode, index) => {
      if (node.id === noParentNode.id) this.noParent.splice(index, 1)
    })
  }

  add (node, addNoParent = true) {
    // console.log('enter: ' + node.id)
    let parentNode = this.search(node.parent)
    // console.log(parentNode)
    if (parentNode !== null) {
      parentNode.children.push(node)
      // console.log('push: ' + node.id)
      this.noParentRemove(node)
      this.noParent.forEach((noParentNode) => {
        this.add(noParentNode, false)
      })
    } else {
      if (addNoParent) this.noParent.push(node)
    }
  }

  setOptions () {
    this.optionsTraversal(this.root.children[0])
    //
  }

  optionsTraversal (node, level = 0) {
    let levelString = '└'
    for (var i = 0; i < level; i++) {
      levelString = '　' + levelString
    }
    this.options.push({ text: levelString + node.name, value: node.id })
    node.children.forEach((childrenNode) => {
      this.optionsTraversal(childrenNode, level + 1)
    })
  }
}
