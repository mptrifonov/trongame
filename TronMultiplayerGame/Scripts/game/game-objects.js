function Snake(connectionId) {
    this.id    = connectionId;
    this.x     = Math.floor(Math.random() * map.tilecount);
    this.y     = Math.floor(Math.random() * map.tilecount);
    this.xvel  = 0;
    this.yvel  = 0;
    this.tail  = 1;
    this.trail = [];
}

function Map() {
    this.gridsize  = 20;
    this.tilecount = 40;
}