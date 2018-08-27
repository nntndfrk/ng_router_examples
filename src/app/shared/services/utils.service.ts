export class UtilsService {
  nl2br(text: string): string {
    return text.replace(/([^>])\n/g, '$1<br/>');
  }
}
