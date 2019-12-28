class TreeNode {
    constructor(parent, pos, value, depth) {
        this.parent = parent // for backtracking
        this.pos = pos
        this.value = value // SPACE or OXYGEN_SYSTEM
        this.depth = depth
        maxDepth = Math.max(maxDepth, depth)
        this.children = []
    }
    addChild(pos, value) {
        const child = new TreeNode(this, pos, value, this.depth + 1)
        this.children.push(child)
        return child
    }
    getNextUnvisitedChild() {
        return this.children.find(child => child.value === null)
    }
    hasChild(pos) {
        const found = this.children.find(
            child => child.pos.x === pos.x && child.pos.y === pos.y
        )
        return !!found
    }
    isParentPosition(pos) {
        if (this.parent === null) return false
        return pos.x === this.parent.pos.x && pos.y === this.parent.pos.y
    }
    toString(level = 0) {
        return `${' '.repeat(level)}(${this.pos.x}, ${this.pos.y}) : ${
            this.value
        }`
    }
}
