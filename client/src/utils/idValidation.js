import bcrypt from 'bcryptjs'

export default {
  async hash(userId) {
    return await bcrypt.hash(userId, 12);
  },
  async verify(userId, currentUserId) {
    return await bcrypt.compare(userId, currentUserId)
  }
}
