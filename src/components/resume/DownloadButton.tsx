import html2canvas from "html2canvas";
import * as React from "react";

import Button from "@/components/buttons/Button";

type Props = { selector: string; filename?: string; downloadText?: string }

export default function DownloadButton(props: Props) {
  const { selector, filename = 'resume', downloadText = '履歴書をダウンロードする' } = props
  return (
    <Button
      onClick={() => {
        const element = document.querySelector(
          selector
        ) as HTMLHtmlElement;

        html2canvas(element).then(function (canvas) {
          const base64 = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = base64;
          a.download = filename;
          a.click();
          a.remove()
        });
      }}
    >
      {downloadText}
    </Button>
  )

}
