import Image from "next/image";

import { board, color_id, move, move_type, piece, PieceInfo, PieceRenderProps, point } from "../types";
import { in_bounds } from "../utils";
import {edge_mover} from "./piece";

export const queen: PieceInfo = {
    render: (color) => <Queen color={color} />,
    moves: moves_queen
}

function Queen({ color }: PieceRenderProps) {
    return <Image src={`/queen_${color}.png`} alt={"queen"} width={50} height={50} />;
}

function moves_queen(board: board, position: point): move[] {
    const directions = [
        {x: -1, y: -1},
        {x: 0, y: -1},
        {x: +1, y: -1},
        {x: +1, y: 0},
        {x: +1, y: +1},
        {x: 0, y: +1},
        {x: -1, y: +1},
        {x: -1, y: 0},
    ];

    return edge_mover(board, position, directions);
}
