//
//  HomeView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct HomeView: View {
  @StateObject private var servicesViewModel = ServiceViewModel()
  
  var body: some View {
    NavigationView {
      List {
        NavigationLink {
          ServiceDetailView(recommendedServices:  servicesViewModel.serviceInfoList)
        } label: {
          IntroductionRow()
        }
        NavigationLink {
          ServiceDetailView(recommendedServices: [ServiceInfo(id: 2, name: "Service 2")])
        } label: {
          IntroductionRow()
        }
        NavigationLink {
          ServiceDetailView(recommendedServices: [ServiceInfo(id: 2, name: "Service 2")])
        } label: {
          ServiceInfoRow(text: "Autoiiiiiiiiiiiiiit!")
        }
      }
      .navigationTitle("Flows")
    }.onAppear {
      Task {
        await self.servicesViewModel.loadList(serviceType: .Recommended)
      }
    }
  }
}

struct HomeView_Previews: PreviewProvider {
  static var previews: some View {
    HomeView()
  }
}
