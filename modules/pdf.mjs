let loading;
export async function loadPDF() {
  if (!loading) loading = import('../vendor/pdfjs/build/pdf.min.mjs').then(pdf => {
    pdf.GlobalWorkerOptions.workerSrc = new URL('../vendor/pdfjs/build/pdf.worker.min.mjs', import.meta.url).href;
    return pdf;
  }).catch(error => { loading = null; throw error; });
  return loading;
}
export function pdfOptions(data) {
  return { data, isEvalSupported: false, cMapUrl: new URL('../vendor/pdfjs/cmaps/', import.meta.url).href, cMapPacked: true, standardFontDataUrl: new URL('../vendor/pdfjs/standard_fonts/', import.meta.url).href, wasmUrl: new URL('../vendor/pdfjs/wasm/', import.meta.url).href, iccUrl: new URL('../vendor/pdfjs/iccs/', import.meta.url).href };
}
