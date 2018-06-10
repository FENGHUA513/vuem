import html2canvas from 'html2canvas'
function takeScreenshot (options) {
  let {
      targetElement,
      onSuccess
  } = options
  html2canvas(targetElement).then(function (canvas) {
    canvas.toBlob(function (blob) {
      onSuccess(blob)
    })
  })
}

export default takeScreenshot
