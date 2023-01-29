import Image from "next/image";

import { board, board_state, color_id, move, move_type, p, PieceInfo, PieceRenderProps, point, special_move } from "../types";
import { can_castle, in_bounds } from "../utils";

export const king: PieceInfo = {
    render: (color) => <King color={color} />,
    moves: moves_king,
    do_special: do_castle
}

function King({ color }: PieceRenderProps) {
    return <Image src={"/king_" + color + ".png"} alt={"king"} width={50} height={50} />;
}

function moves_king(board: board, position: point): move[] {
    const piece = board[position.x][position.y];

    let king_moves: point[] = [];
    for (let i = -1; i <= 1; ++i) {
        for (let j = -1; j <= 1; ++j) {
            king_moves.push({ x: i, y: j });
        }
    }

    let moves: move[] = [];

    // if not at edge of the board
    king_moves.forEach(move => {
        if (in_bounds(position.x + move.x) && in_bounds(position.y + move.y)) {
            const new_pos = { x: position.x + move.x, y: position.y + move.y };
            if (board[new_pos.x][new_pos.y].color === color_id.none) {
                moves.push({ position: new_pos, type: move_type.move });
            } else if (board[new_pos.x][new_pos.y].color !== piece.color) {
                moves.push({ position: new_pos, type: move_type.capture });
            }
        }
    })

    // castling: KNOWN BUG: Can't castle to own square
    if (!piece.has_moved) {
        right_castle:
        for (let x = position.x + 1; in_bounds(x); ++x) {
            const target_piece = board[x][position.y];
            if (target_piece.color !== color_id.none) { // First non-empty square
                if (target_piece.color === piece.color && !target_piece.has_moved && can_castle(target_piece.piece)) { // This piece can be castled with
                    // Check that path to target squares is empty
                    if (x <= 5) { // The target piece is on f or earlier
                        for (let c = x + 1; c <= 6; ++c) { // everything else upto g is empty
                            if (board[c][position.y].color !== color_id.none) {
                                break right_castle; // Non-empty castling path
                            }
                        }
                    } else {
                        // The target is either on g or h, we know that everything between king and target is empty
                        // Only need to consider the case where king at g, target at h
                        if (board[5][position.y].color !== color_id.none) { // Taken f file
                            break right_castle;
                        }
                    }

                    // Castling is valid:
                    const castle: special_move = { position: { x: 6, y: position.y }, type: move_type.special, targets: [{ x: x, y: position.y }] }  // Need to move target to d, king to c
                    moves.push(castle) // Need to move target to f, king to g
                }
                break right_castle;
            }
        }

        left_castle:
        for (let x = position.x - 1; in_bounds(x); --x) {
            const target_piece = board[x][position.y];
            if (target_piece.color !== color_id.none) { // First non-empty square
                if (target_piece.color === piece.color && !target_piece.has_moved && can_castle(target_piece.piece)) { // This piece can be castled with
                    // Check that path to target squares is empty
                    if (x >= 3) { // The target piece is on d or later
                        for (let c = x - 1; c >= 2; --c) { // everything else upto c is empty
                            if (board[c][position.y].color !== color_id.none) {
                                break left_castle; // Non-empty castling path
                            }
                        }
                    } else {
                        // The target is either on c, b, or a, we know that everything between king and target is empty
                        // Only need to consider the case where king at b, target at a, or king at c, target to the left
                        // In the first, we need c to be empty. In both cases, we need d to be empty
                        if (board[3][position.y].color !== color_id.none) { // Taken d file
                            break left_castle;
                        } else if (position.x == 1 && board[2][position.y].color != color_id.none) { // king at b, c taken
                            break left_castle;
                        }
                    }

                    // Castling is valid:
                    const castle: special_move = { position: { x: 2, y: position.y }, type: move_type.special, targets: [{ x: x, y: position.y }] }  // Need to move target to d, king to c
                    moves.push(castle)
                }
                break left_castle;
            }
        }
    }

    return moves;
}


function do_castle(board: board, position: point, mov: special_move): board {
    const k = board[position.x][position.y];
    // assert(mov.targets.length === 1);
    const t_pos = mov.targets[0];
    const t = board[t_pos.x][t_pos.y];

    if (k === p || t === p) return board; // castling has already happened

    board[position.x][position.y] = p;
    board[t_pos.x][t_pos.y] = p;
    k.has_moved = true;
    t.has_moved = true;
    if (position.x < t_pos.x) {
        console.log("right castle")
        board[6][position.y] = k;
        board[5][position.y] = t;
    } else {
        console.log("left castle")
        board[2][position.y] = k;
        board[3][position.y] = t;
    }

    return board
}
