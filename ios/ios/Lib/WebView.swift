//
//  WebView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/9.
//

import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
  let request: URLRequest
  
  func makeUIView(context: Context) -> some WKWebView {
    return WKWebView()
  }
  
  func updateUIView(_ uiView: UIViewType, context: Context) {
    uiView.load(self.request)
  }
}

#if DEBUG

struct WebView_Previews: PreviewProvider {
  static var previews: some View {
    WebView(request: URLRequest(url: URL(string: "https://www.apple.cn")!))
  }
}

#endif

