import Image from "next/image";

import { board, color_id, move, move_type, piece, PieceInfo, PieceRenderProps, point } from "../types";
import { in_bounds } from "../utils";

export const queen: PieceInfo = {
    render: (color) => <Queen color={color} />,
    moves: moves_queen
}

function Queen({ color }: PieceRenderProps) {
    return <Image src={`/queen_${color}.png`} alt={"queen"} width={50} height={50} />;
}

function moves_queen(board: board, position: point): move[] {
    let moves: move[] = [];

    const my_color = board[position.x][position.y].color;
    let vecs: point[] = [];
    for (let i = -1; i <= 1; ++i) {
        for (let j = -1; j <= 1; ++j) {
            vecs.push({ x: i, y: j});
        }
    }

    vecs.forEach(vec => {
        for (let i = 1; i < 8; ++i) {
            const dest: point = { x: position.x + vec.x * i, y: position.y + vec.y * i };
            if (!in_bounds(dest.x) || !in_bounds(dest.y) || board[dest.x][dest.y].color === my_color) { break; }
            if (board[dest.x][dest.y].color !== color_id.none) { moves.push({ position: dest, type: move_type.capture }); break; }
            moves.push({ position: dest, type: move_type.move })
        }
    })

    return moves;
}
