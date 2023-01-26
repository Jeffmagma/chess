import Image from "next/image";

import { board, color_id, move, move_type, piece, PieceInfo, PieceRenderProps, point } from "../types";
import { in_bounds } from "../utils";

export const bishop: PieceInfo = {
    render: (color) => <Bishop color={color} />,
    moves: moves_bishop
}

function Bishop({ color }: PieceRenderProps) {
    return <Image src={"/thirteen.svg"} alt={"bishop"} width={50} height={50} />;
}

function moves_bishop(board: board, position: point): move[] {
    let moves: move[] = [];

    const vecs: point[] = [{ x: -1, y: -1 }, { x: -1, y: 1}, { x: 1, y: - 1}, { x: 1, y: 1}];
    const my_color = board[position.x][position.y].color;

    vecs.forEach( vec => {
        for (let i = 1; i < 8; ++i) {
            const dest: point = {x: position.x + vec.x * i, y: position.y + vec.y * i};
            if (!in_bounds(dest.x) || !in_bounds(dest.y) || board[dest.x][dest.y].color === my_color) { break; }
            if (board[dest.x][dest.y].color !== color_id.none) { moves.push({ position: dest, type: move_type.capture }); break; }
            moves.push({ position: dest, type: move_type.move })
        }
    })

    return moves;
}
