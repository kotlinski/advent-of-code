import { all_directions, Direction } from '../../../common/matrix/grid/direction.js';
import { MirrorTileValue } from '../solver.js';

export function createDirectionMapper(value: MirrorTileValue): Map<Direction, Direction[]> {
  const mapper = new Map<Direction, Direction[]>();
  switch (value) {
    case '.':
      populateWithEmptyDirections(mapper);
      break;
    case '-':
      populateHorizontalMapper(mapper);
      break;
    case '|':
      populateVerticalMapper(mapper);
      break;
    case '/':
      populateRightTiltedMapper(mapper);
      break;
    case '\\':
      populateLeftTiltedMapper(mapper);
      break;
  }
  return mapper;
}

/**
 * '.' The flow should continue in the same direction
 */
function populateWithEmptyDirections(mapper: Map<Direction, Direction[]>) {
  all_directions.forEach((direction) => {
    mapper.set(direction, [direction]);
  });
}

/**
 * '-' The flow should continue if horizontal, otherwise continue up and down
 */
function populateHorizontalMapper(mapper: Map<Direction, Direction[]>) {
  all_directions.forEach((direction) => {
    if (['left', 'right'].includes(direction)) {
      mapper.set(direction, [direction]);
    } else {
      mapper.set(direction, ['left', 'right']);
    }
  });
}

/**
 * '|' The flow should continue if vertical, otherwise continue up and down
 */
function populateVerticalMapper(mapper: Map<Direction, Direction[]>) {
  all_directions.forEach((direction) => {
    if (['up', 'down'].includes(direction)) {
      mapper.set(direction, [direction]);
    } else {
      mapper.set(direction, ['up', 'down']);
    }
  });
}
/**
 * '/' The flow should continue if vertical, otherwise continue up and down
 */
function populateRightTiltedMapper(mapper: Map<Direction, Direction[]>) {
  all_directions.forEach((direction) => {
    switch (direction) {
      case 'up':
        mapper.set(direction, ['right']);
        break;
      case 'down':
        mapper.set(direction, ['left']);
        break;
      case 'left':
        mapper.set(direction, ['down']);
        break;
      case 'right':
        mapper.set(direction, ['up']);
        break;
    }
  });
}
/**
 * '\' The flow should continue if vertical, otherwise continue up and down
 */
function populateLeftTiltedMapper(mapper: Map<Direction, Direction[]>) {
  all_directions.forEach((direction) => {
    switch (direction) {
      case 'up':
        mapper.set(direction, ['left']);
        break;
      case 'down':
        mapper.set(direction, ['right']);
        break;
      case 'left':
        mapper.set(direction, ['up']);
        break;
      case 'right':
        mapper.set(direction, ['down']);
        break;
    }
  });
}
