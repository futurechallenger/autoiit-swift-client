//
//  HomeView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct HomeView: View {
  var body: some View {
    NavigationView {
      List {
        NavigationLink {
          ServiceDetailView()
        } label: {
          IntroductionRow()
        }
        NavigationLink {
          ServiceDetailView()
        } label: {
          IntroductionRow()
        }
        NavigationLink {
          ServiceDetailView()
        } label: {
          ServiceInfoRow(text: "Autoiiiiiiiiiiiiiit!")
        }
      }
      .navigationTitle("Flows")
    }
  }
}

struct HomeView_Previews: PreviewProvider {
  static var previews: some View {
    HomeView()
  }
}
