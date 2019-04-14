export class IndexUtils {
    static transformIndexOnInsert(index, insertIndex, value) {
        if (insertIndex <= index) {
            return index + value.length;
        }
        return index;
    }
    static transformIndexOnDelete(index, deleteIndex, length) {
        if (index > deleteIndex) {
            return index - Math.min(index - deleteIndex, length);
        }
        return index;
    }
}
