import { CommonDAO } from './CommonDAO';
import { Priority } from '../../../model/priority';

// специфичные методы для работы приоритетами (которые не входят в обычный CRUD)
export interface PriorityDAO extends CommonDAO<Priority> {

  // здесь будут специфичные методы для работы с категориями (на будущее)
}
