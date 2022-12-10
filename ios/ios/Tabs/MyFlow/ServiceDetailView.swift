//
//  ServiceDetailView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct ServiceDetailView: View {
  @State private var showPopover = false
  var service: ServiceInfo
  
  var body: some View {
    VStack {
      Group {
        Text(self.service.name)
        
        Divider()
        
        Button  {
          if !showPopover {
            showPopover = true
          }
        } label: {
          Text("Connect")
        }
        .buttonStyle(.borderedProminent)
        .buttonBorderShape(.roundedRectangle(radius: 30))
        .popover(isPresented: self.$showPopover) {
          WebView(request: URLRequest(url: URL(string: "https://www.apple.cn")!))
        }
      }
      .padding(.top, 20)
      Spacer()
    }
    .frame(alignment: .top)
  }
}

struct ServiceDetailView_Previews: PreviewProvider {
  static var previews: some View {
    ServiceDetailView(service: ServiceInfo(id: 1, name: "Sample Service"))
  }
}

