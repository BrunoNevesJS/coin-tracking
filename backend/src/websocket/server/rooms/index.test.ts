import Rooms from ".";

describe("test functions rooms", () => {
  it("should create a new room", () => {
    const rooms = new Rooms();
    rooms.createRoom('room');

    expect(rooms.rooms.size).toBe(1);
  });

  it("should be able to find room and get it", () => {
    const rooms = new Rooms();
    rooms.createRoom('room');

    expect(rooms.getRoomById('room')).toStrictEqual([]);
  });

  it("should check rooms exists", () => {
    const rooms = new Rooms();
    rooms.createRoom('room');

    expect(rooms.hasRoom('room')).toBe(true);
  });

  it("should check rooms not exists", () => {
    const rooms = new Rooms();

    expect(rooms.hasRoom('room')).toBe(false);
  });
});
