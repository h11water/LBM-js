function Obstacles() {
    this.options = {
        init_density: 1,
        init_velocity: [0.15,0],
        obstacle_pos: 1/4,
        obstacle_size: 1/5
    };

    this.init_cells = function(cells) {
        var flow_vel = new Vec2(this.options.init_velocity[0], this.options.init_velocity[1]);
        var v_dot_v = flow_vel.dot(flow_vel);

        for (var r = 0; r < cells[0].length; r++) {
            for (var c = 0; c < cells.length; c++) {
                for (var i = 0; i < 9; i++) {
                    cells[c][r][i] = get_equi(i, this.options.init_density, flow_vel, v_dot_v)//+Math.random()*0.01;
                }
            }
        }
    };

    this.init_obstacles = function(obstacles) {
        // position of default obstacle
        var obstacle_col = Math.floor(this.options.obstacle_pos * lbm_options.cols);
        var obstacle_row_min = Math.floor(lbm_options.rows / 2 - this.options.obstacle_size / 2 * lbm_options.rows);
        var obstacle_row_max = Math.floor(lbm_options.rows / 2 + this.options.obstacle_size / 2 * lbm_options.rows);

        for (var r = obstacle_row_min; r <= obstacle_row_max; r++) {
            obstacles[obstacle_col][r] = true;
        }
    };

    this.mouse_action = function(cells, position) {
        var c = position.x;
        var r = position.y;
        obstacles[c][r] = !obstacles[c][r];
    };
}